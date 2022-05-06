import React, { useState, useEffect, useRef, useContext } from 'react'

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { i18nChangeLanguage } from '@wangeditor/editor'
import { uploadImg } from '../../firebase/firebase-utils'
import { DomEditor } from '@wangeditor/editor'
import { RootStoreContext } from '../../App'

type InsertFnType = (url: string, alt: string, href: string) => void

interface MyEditorProps {
  placeholder: string,
  updateCallback: (htmlString: string) => void
}

const MyEditor = ({ placeholder, updateCallback }: MyEditorProps) => {
    const [editor, setEditor] = useState<IDomEditor | null>(null) // 存储 editor 实例
    const [htmlString, setHtmlString] = useState(placeholder) // 编辑器内容
    const { globalUiStore } = useContext(RootStoreContext)
    i18nChangeLanguage('en')

    const toolbarConfig: Partial<IToolbarConfig> = {
        excludeKeys: [
            'blockquote',
            // 'codeBlock',
            'insertTable',
            "group-video",
            'insertImage',
            'group-more-style',
        ],
        
    };

    const editorConfig: Partial<IEditorConfig> = {
        placeholder: htmlString,
        MENU_CONF: {},
    }

    // the customized image upload function, because we want to use firestore and the res of firestore is not accord to the requirements of wangEditor
    if(editorConfig?.MENU_CONF) {
        editorConfig.MENU_CONF.uploadImage = {
            customUpload(file: File, insertFn: InsertFnType) {
            globalUiStore.upLoadingImg = true
            uploadImg(file.name, file)
            .then(imgUrl => {
                globalUiStore.upLoadingImg = false
                //update image to the editor based on the online url that is returned by the database
                insertFn(imgUrl, file.name, '')})
        }}
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    useEffect(() => {
      updateCallback(htmlString)
    }, [htmlString])

    //update this component when parent node passes in new params (placeHolder)
    useEffect(() => {
        setHtmlString(placeholder)
    }, [placeholder])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={htmlString}
                    onCreated={setEditor}
                    onChange={editor => setHtmlString(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px' }}
                />
            </div>
            {/* <div style={{ marginTop: '15px' }}>
                {htmlString}
            </div> */}
        </>
    )
}

export default MyEditor