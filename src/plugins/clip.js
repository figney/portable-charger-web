import ClipboardJS from "clipboard"

export default async (content) => {
    var aux = document.createElement("input"); 
    aux.style.position = "fixed"
    aux.style.opacity = "0"
    aux.setAttribute("value", content); 
    aux.id = 'set-clip-btn'
    document.body.appendChild(aux);
    var result = await new Promise((resolve)=>{
      var btn = document.createElement('button');
      var cb = new ClipboardJS(btn,{
        target: ()=>{
          return document.getElementById('set-clip-btn');
        }
      })
      cb.on('success',()=>{
        resolve(true)
      })
      cb.on('error',()=>{
        resolve(false)
      })
      btn.click()
    })
    // aux.focus();
    // aux.select();
    // document.execCommand("copy"); 
    document.body.removeChild(aux);
    return result
  }