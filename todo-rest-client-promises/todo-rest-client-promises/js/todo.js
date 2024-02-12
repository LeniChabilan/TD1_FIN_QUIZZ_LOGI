$(function() {

    $("#button").click(refreshTaskList);

    function remplirTaches(tasks) {
      console.log(JSON.stringify(tasks));
      $('#taches').empty();
      $('#taches').append($('<ul>'));
      for(task of tasks){
          console.log(task);
          $('#taches ul')
                .append($('<li>')
                .append($('<a>')
                .text(task.title)
                    ).on("click", task, details)
                );
        }
      }

      function onerror(err) {
          $("#taches").html("<b>Impossible de récupérer les taches à réaliser !</b>"+err);
      }

    function refreshTaskList(){
        $("#currenttask").empty();
        requete = "http://localhost:3000/todo/api/v1.0/quizz";
        fetch(requete)
        .then( response => {
                  if (response.ok) return response.json();
                  else throw new Error('Problème ajax: '+response.status);
                }
            )
        .then(remplirTaches)
        .catch(onerror);
      }


    function details(event){
        $("#currenttask").empty();
        formTask();
        fillFormTask(event.data);
        }


    class Task{
        constructor(title, description, done, uri){
            this.title = title;
            this.description = description;
            this.done = done;
            this.uri = uri;
            console.log(this.uri);
        }
    }


    $("#tools #add").on("click", formTask);
    $('#tools #del').on('click', delTask);

    function formTask(isnew){
        $("#currenttask").empty();
        $("#currenttask")
            .append($('<span>Titre<input type="text" id="titre"><br></span>'))
            .append($('<span>Description<input type="text" id="descr"><br></span>'))
            .append($('<span>Done<input type="checkbox" id="done"><br></span>'))
            .append($('<span><input type="hidden" id="turi"><br></span>'))
            .append(isnew?$('<span><input type="button" value="Save Task"><br></span>').on("click", saveNewTask)
                         :$('<span><input type="button" value="Modify Task"><br></span>').on("click", saveModifiedTask)
                );
        }

    function fillFormTask(t){
        $("#currenttask #titre").val(t.title);
        $("#currenttask #descr").val(t.description);
         t.uri=(t.uri == undefined)?"http://localhost:3000/tasks/"+t.id:t.uri;
         $("#currenttask #turi").val(t.uri);
        t.done?$("#currenttask #done").prop('checked', true):
        $("#currenttask #done").prop('checked', false);
    }

    function saveNewTask(){
        var task = new Task(
            $("#currenttask #titre").val(),
            $("#currenttask #descr").val(),
            $("#currenttask #done").is(':checked')
            );
        console.log(JSON.stringify(task));
        fetch("http://localhost:3000/tasks/",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(task)
            })
        .then(res => { console.log('Save Success') ;
                       $("#result").text(res['contenu']);
                       refreshTaskList();
                   })
        .catch( res => { console.log(res) });
    }

    function saveModifiedTask(){
        var task = new Task(
            $("#currenttask #titre").val(),
            $("#currenttask #descr").val(),
            $("#currenttask #done").is(':checked'),
            $("#currenttask #turi").val()
            );
        console.log("PUT");
        console.log(task.uri);
        console.log(JSON.stringify(task));
        fetch(task.uri,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(task)
            })
        .then(res => { console.log('Update Success');  refreshTaskList();} )
        .catch( res => { console.log(res) });
    }

    function delTask(){
        if ($("#currenttask #turi").val()){
        url = $("#currenttask #turi").val();
        fetch(url,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE"
            })
        .then(res => { console.log('Delete Success:' + res); } )
        .then(refreshTaskList)
        .catch( res => { console.log(res);  });
    }
  }
});
