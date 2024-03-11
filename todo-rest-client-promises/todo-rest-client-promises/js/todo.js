$(function() {

    $("#button").click(refreshQuestionnaireList);

    function remplirQuestionnaire(questionnaires) {
        console.log(JSON.stringify(questionnaires));
        $('#taches').empty();
        $('#taches').append($('<ul>'));
        console.log('ici');
        for (question of questionnaires["Questionnaire"]) {
            console.log(question);
            $('#taches ul')
                .append($('<li>')
                    .append($('<a>')
                        .text(question.name)
                        .on("click", question, details) 
                    )
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



      function details(event) {
        $("#currenttask").empty();
        formQuestionnaire();
        fillformQuestionnaire(event.data);
        $("#tools #add").on("click", formQuestionnaire);
        $('#tools #del').on('click', delQuestionnaire);
        $("#question").empty(); 

    
        fetch("http://localhost:5555/todo/api/v1.0/quizz/" + event.data.id + "/question")
            .then(response => {
                if (response.ok) return response.json();
                else throw new Error('Problème ajax: ' + response.status);
            })
            .then(questions => {
                questions.Questions.forEach(question => {
                    $("#question").append(`<div class="question-item" data-question-id="${question.id}">${question.title}</div>`);
                });
    
                $(".question-item").click(function() {
                    var questionId = $(this).attr("data-question-id");
                    console.log("questionId: " + questionId);
                    fetch("http://localhost:5555/todo/api/v1.0/quizz/" + event.data.id + "/question/" + questionId)
                        .then(response => {
                            if (response.ok) return response.json();
                            else throw new Error('Problème ajax: ' + response.status);
                        })
                        .then(question => {
                            formQuestion();
                            fillFormQuestion(question);
                            $("#tools #add").on("click", formQuestion);
                            $('#tools #del').on('click', delQuestion);
                        })
                        .catch(error => {
                            console.error('Erreur lors de la récupération des détails de la question:', error);
                        });
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des questions:', error);
            });
    }
    
    

    class Questionnaire{
        constructor(id, name){
            this.id = id;
            this.name = name;
        }
    }

    class Question{
        constructor(id, title, questionType, questionnaire_id){
            this.id = id;
            this.title = title;
            this.questionType = questionType;
            this.questionnaire_id = questionnaire_id;
        }
    }


    function formQuestionnaire(isnew){
        $("#currenttask").empty();
        $("#currenttask")
            .append($('<span>Id<input type="text" id="id" readonly><br></span>'))
            .append($('<span>Name<input type="text" id="name"><br></span>'))
            .append(isnew?$('<span><input type="button" value="Save Questionnaire"><br></span>').on("click", saveNewQuestionnaire)
                         :$('<span><input type="button" value="Modify Questionnaire"><br></span>').on("click", saveModifiedQuestionnaire)
                );
        }

    function formQuestion(isnew){
        $("#currenttask").empty();
        $("#currenttask")
            .append($('<span>Id<input placeholder="ID RANDOM" type="text" id="id" readonly><br></span>'))
            .append($('<span>Title<input type="text" id="title"><br></span>'))
            .append($('<span>questionType<input type="text" id="questionType"><br></span>'))
            .append($('<span>questionnaire_id<input type="text" id="questionnaire_id"><br></span>'))
            .append(isnew?$('<span><input type="button" value="Save Task"><br></span>').on("click", saveNewQuestion)
                         :$('<span><input type="button" value="Modify Question"><br></span>').on("click", saveModifiedQuestion)
                );
        }

    function fillformQuestionnaire(t){
        $("#currenttask #id").val(t.id);
        $("#currenttask #name").val(t.name);
    }

    function fillFormQuestion(t){
        $("#currenttask #id").val(t.id);
        $("#currenttask #title").val(t.title);
        $("#currenttask #questionType").val(t.questionType);
        $("#currenttask #questionnaire_id").val(t.questionnaire_id);
    }
    function saveNewQuestionnaire(){
        var questionnaire = new Questionnaire(
            $("#currenttask #id").val(),
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

    function saveModifiedQuestionnaire(){
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

    function saveModifiedQuestion() {
        var question = new Question(
            $("#currenttask #id").val(),
            $("#currenttask #title").val(),
            $("#currenttask #questionType").val(),
            $("#currenttask #questionnaire_id").val()
        );
        fetch("http://localhost:5555/todo/api/v1.0/quizz/" + question.questionnaire_id + "/question/" + question.id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(question)
        })
        .then(response => {
            if (response.ok) {
                console.log('Mise à jour réussie');
                refreshQuestionList(question.questionnaire_id); 
            } else {
                throw new Error('Erreur lors de la mise à jour de la question');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    }
    function refreshQuestionList(questionnaireId) {
        fetch("http://localhost:5555/todo/api/v1.0/quizz/" + questionnaireId + "/question")
            .then(response => {
                if (response.ok) return response.json();
                else throw new Error('Problème ajax: ' + response.status);
            })
            .then(questions => {
                $("#question").empty();
    
                questions.Questions.forEach(question => {
                    $("#question").append(`<div class="question-item" data-question-id="${question.id}">${question.title}</div>`);
                });
    
                $(".question-item").click(function() {
                    var questionId = $(this).attr("data-question-id");
                    console.log("questionId: " + questionId);
                    fetch("http://localhost:5555/todo/api/v1.0/quizz/" + questionnaireId + "/question/" + questionId)
                        .then(response => {
                            if (response.ok) return response.json();
                            else throw new Error('Problème ajax: ' + response.status);
                        })
                        .then(question => {
                            formQuestion();
                            fillFormQuestion(question);
                            $("#tools #add").on("click", formQuestion);
                            $('#tools #del').on('click', delQuestion);
                        })
                        .catch(error => {
                            console.error('Erreur lors de la récupération des détails de la question:', error);
                        });
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des questions:', error);
            });
    }
    

    function saveNewQuestion() {
        var question = new Question(
            $("#currenttask #id").val(),
            $("#currenttask #title").val(),
            $("#currenttask #questionType").val(),
            $("#currenttask #questionnaire_id").val(),
        );
        fetch("http://localhost:5555/todo/api/v1.0/quizz/" + question.questionnaire_id + "/question", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(question)
        })
        .then(response => {
            if (response.ok) {
                console.log('Mise à jour réussie');
                refreshQuestionList(question.questionnaire_id);
            } else {
                throw new Error('Erreur lors de la mise à jour de la question');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
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

  function delQuestion(idQuestionnaire, idQuestion) {
    idQuestionnaire = $("#currenttask #questionnaire_id").val();
    idQuestion = $("#currenttask #id").val();
    fetch("http://localhost:5555/todo/api/v1.0/quizz/" + idQuestionnaire + "/question/" + idQuestion, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            console.log('Suppression de la question réussie');
            refreshQuestionList(idQuestionnaire); 
        } else {
            throw new Error('Erreur lors de la suppression de la question');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}



});

