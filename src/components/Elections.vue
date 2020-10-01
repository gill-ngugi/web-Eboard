<template>
    <h1>
        <div class="card">
            <div class="question">
                <p>{{ curentquestion.question }}</p>
            </div>
            <div class="answers">
            <div
                class="single_answer"
                v-on:click="answeClicked(answer, index)"
                v-for="(answer, index) in answers"
                v-bind:key="answer.answer"
            >
            <li
                v-bind:class="[
                    (selectedAnswer!=null&&answer==selectedAnswer.answer)
                    ? 'selected_answer'
                    : 'deselected_answer',
                ]"
            >
                {{ answer }}
            </li>
            </div>
        </div>
        <div class="controller">
            <button v-on:click="previous">previous</button>
            <button>Save</button>
            <button v-on:click="()=>{quizindex==quizcount-1?preview():next()}">  {{quizindex==quizcount-1?"Preview":"Next"}}</button>
        </div>
        </div>
    </h1>
</template>

<script>
    export default {
        props: {
            curentquestion: Object,
            next: Function,
            previous: Function,
            onAnswerSelection: Function,
            quizindex:Number,
            quizcount:Number,
            preview:Function,
        },

        data() {
            return { 
            answers:this.curentquestion.incorrect_answers,
            selectedAnswer:Object,
            };
        },

        methods: {
            answeClicked: function(selectedAnswer) {
            //  alert(selectedAnswer)
            this.selectedAnswer={answer:selectedAnswer,selected:true};

            // this.answers=  this.answers.map((answer)=>{
            
            //     if(answer.answer==this.selectedAnswer.answer){
                
            //       return this.selectedAnswer;
            //     }
            //     return {...answer,selected:false}
            //   })
            //alert(this.selectedAnswer)
            this.onAnswerSelection(this.selectedAnswer,this.quizindex);
            },

            getSelectionIndex: function() {
            return this.curentquestion.incorrect_answers.findIndex((answer) => {
                console.log(this.selectedAnswer);
                return this.selectedAnswer == answer;
            });
            },
        },

        computed: {
        
        },

        mounted: () => {

        },

        updated: function() {
            this.answers=this.curentquestion.incorrect_answers;
            this.selectedAnswer=this.curentquestion.selected_answer;
        },
    };
</script>

<style>
    .card {
        margin: 20px;
        border: 3px solid grey;
        display: flex;
        flex-direction: column;
        min-height: 50vh;
        border-radius: 3px;
        box-shadow: 2px 2px 2px 2px rgb(156, 144, 144);
        max-width: 80vw;
        justify-content: center;
    }

    .card > .question {
        align-items: flex-start;
        display: flex;
        font-size: 20px;
        flex: 0.2;
    }

    .single_answer {
        flex: 0.2;
        justify-items: start;
        padding: 20px;
    }

    .selected_answer {
        background-color: brown;
    }

    .deselected_answer {
        background-color: white;
    }

    .single_answer:hover {
        background-color: brown;
    }

    .card > .answers {
        font-size: 20px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-start;
        flex: 0.7;
    }

    .card > .controller {
        flex: 0.1;
    }

    .controller > button {
        margin-left: 30px;
    }

    .controller > button:first-child {
        background: lightblue;
        min-width: 80px;
        border-radius: 30px;
    }

    .controller > button:last-child {
        background: green;
        min-width: 80px;
        border-radius: 30px;
    }
</style>
