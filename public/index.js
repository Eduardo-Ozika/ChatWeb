$(
    ()=>{
        const socket = io()
        let login
        $("#form1").on("submit", () =>{
            if(login)    
                socket.emit("chat msg", $("#msg").val())
            else{
                socket.emit("login", $("#msg").val())
                login = $("#msg").val()
            }
            return false;
        })
        socket.on("chat msg", msg => $("#messages").append($("<li>").text(msg)))
    }
)