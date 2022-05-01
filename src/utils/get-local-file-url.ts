export const getObjectURL = (file: any) => { 
  var url = null; 
  if ((window as any).createObjcectURL!= undefined) { 
    url = (window as any).createOjcectURL(file);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
    
  } else if (window.webkitURL != undefined) { 
    url = window.webkitURL.createObjectURL(file);
  } 
  return url; 
}