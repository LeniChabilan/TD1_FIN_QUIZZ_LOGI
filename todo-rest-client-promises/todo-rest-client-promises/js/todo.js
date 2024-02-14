$(function() {

    $("#button").click(refreshQuestionnaireList);

    function remplirQuestionnaire(questionnaires) {
      console.log(JSON.stringify(questionnaires));
      $('#taches').empty();
      $('#taches').append($('<ul>'));
      console.log('ici');
      for(question of questionnaires["Questionnaire"]){
          console.log(question);
          $('#taches ul')
                .append($('<li>')
                .append($('<a>')
                .text(question.name)
                    ).on("click", question, details)
                );
        }
      }

      function onerror(err) {
          $("#taches").html("<b>Impossible de récupérer les taches à réaliser !</b>"+err);
      }

    function refreshQuestionnaireList(){
        $("#currenttask").empty();
        requete = "http://localhost:5555/todo/api/v1.0/quizz";
        fetch(requete)
        .then( response => {
                  if (response.ok) return response.json();
                  else throw new Error('Problème ajax: '+response.status);
                }
            )
        .then(remplirQuestionnaire)
        .catch(onerror);
      }


    function details(event){
        $("#currenttask").empty();
        formTask();
        fillFormTask(event.data);
        }

    class Questionnaire{
        constructor(id, name){
            this.id = id;
            this.name = name;
        }
    }


    $("#tools #add").on("click", formTask);
    $('#tools #del').on('click', delQuestionnaire);

    function formTask(isnew){
        $("#currenttask").empty();
        $("#currenttask")
            .append($('<span>Id<input type="text" id="id" readonly><br></span>'))
            .append($('<span>Name<input type="text" id="name"><br></span>'))
            .append(isnew?$('<span><input type="button" value="Save Task"><br></span>').on("click", saveNewTask)
                         :$('<span><input type="button" value="Modify Task"><br></span>').on("click", saveModifiedTask)
                );
        }

    function fillFormTask(t){
        $("#currenttask #id").val(t.id);
        $("#currenttask #name").val(t.name);
    }

    function saveNewTask(){
        var questionnaire = new Questionnaire(
            $("#currenttask #name").val(),
            );
        console.log(JSON.stringify(questionnaire));
        fetch("http://localhost:5555/todo/api/v1.0/quizz",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(questionnaire)
            })
        .then(res => { console.log('Save Success') ;
                       $("#result").text(res['contenu']);
                       refreshQuestionnaireList();
                   })
        .catch( res => { console.log(res) });
    }

    function saveModifiedTask(){
        var questionnaire = new Questionnaire(
            $("#currenttask #id").val(),
            $("#currenttask #name").val(),
            );
        console.log("PUT");
        console.log(questionnaire.id);
        console.log(JSON.stringify(questionnaire));
        console.log("http://localhost:5555/todo/api/v1.0/quizz/"+questionnaire.id);
        fetch("http://localhost:5555/todo/api/v1.0/quizz/"+questionnaire.id,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(questionnaire)
            })
        .then(res => { console.log('Update Success');  refreshQuestionnaireList();} )
        .catch( res => { console.log(res) });
    }

    function delQuestionnaire(){
        if ($("#currenttask #id").val()){
        url = $("#currenttask #id").val();
        fetch("http://localhost:5555/todo/api/v1.0/quizz/"+url,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE"
            })
        .then(res => { console.log('Delete Success:' + res); } )
        .then(refreshQuestionnaireList)
        .catch( res => { console.log(res);  });
    }
  }
});
