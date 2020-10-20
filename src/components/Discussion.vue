<template>
  <div class="app">
      <!--
    <div class="header__bar">
      <div class="array__container">
        <div class="arrow left array__container"></div>
      </div>
    </div>
    <div class="content_area">
      <div class="side__bar">
        <div class="avator__box avator__box_active">
          <div class="avator"></div>
        </div>
        <div class="avator__box">
          <div class="avator"></div>
        </div>

        <div class="avator__box">
          <div class="avator"></div>
        </div>
      </div>
      <div class="main__content">
        <div class="main__contentReview" v-if="showReview">
          <div
            v-for="category in categories"
            v-bind:key="category.categoryId"
            class="review_category "
          >
            {{ category.categoryName }}
            <div class="review_cointainer">
              <div
                v-for="(question, index) in category.questions"
                v-bind:key="question.questionId"
                class="question_row"
              >
                <div class="question">
                  {{ index + 1 }} {{ question.questionName }}
                </div>
                <div class="question__rate">
                  <div
                    v-bind:key="n"
                    v-for="n in 5"
                    class="rating_circle"
                    v-on:click="
                      () => {
                        //answerSelected(question, activeCategory, n);
                      }
                    "
                    v-bind:class="{
                      ['rating_circle__active ']: n == question.userRate,
                    }"
                  >
                    {{ n }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="save__continue"
            v-on:click="
              () => {
                submitEvaluation();
              }
            "
          >
            Submit Evalution
          </div>
        </div>
        
        <div v-else>
          <div class="category_top">
            <div class="category__list">
              <div
                v-for="category in categories"
                v-bind:key="category.categoryId"
                class="category "
                v-bind:class="{
                  ['category_active']:
                    category.categoryId == activeCategory.categoryId,
                }"
              >
                {{ category.categoryName }}
              </div>
            </div>
            <div class="array__container">
              <div class="arrow right array__container"></div>
            </div>
          </div>
          <div class="progress__count_section">
            {{ currentProgress }}
          </div>
          <div class="question_cointainer">
            <div
              v-for="(question, index) in activeCategory.questions"
              v-bind:key="question.questionId"
              class="question_row"
            >
              <div class="question">
                {{ index + 1 }} {{ question.questionName }}
              </div>
              <div class="question__rate">
                <div
                  v-bind:key="n"
                  v-for="n in 5"
                  class="rating_circle"
                  v-on:click="
                    () => {
                      answerSelected(question, activeCategory, n);
                    }
                  "
                  v-bind:class="{
                    ['rating_circle__active ']: n == question.userRate,
                  }"
                >
                  {{ n }}
                </div>
              </div>
            </div>
            <div
              class="save__continue"
              v-on:click="
                () => {
                  !isLastQuiz ? nextCategory() : reviewEvalution();
                }
              "
            >
              {{ isLastQuiz ? "Review" : " Save And Continue" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
// export default {
//   name: "App",
//   data: () => {
//     return {
//       categories: [],
//       activeCategory: {},
//       showReview: false,
//     };
//   },
//   components: {},
//   methods: {
//     reviewEvalution: function() {
//       this.showReview = true;
//     },
//     answeClicked: () => {
//       alert("david");
//     },
//     nextCategory: function() {
//       //console.log(this.activeCategory)
//       var currentIndex = this.categories.findIndex((category) => {
//         return this.activeCategory.categoryId == category.categoryId;
//       });
//       console.log(currentIndex);
//       this.submitPerCategory(this.activeCategory);
//       this.activeCategory = this.categories[currentIndex + 1];
//     },
//     previousCategory: () => {},
//     submitPerCategory: function(activeCategorySubmit) {
//       var answers = activeCategorySubmit.questions
//         .filter((quiz) => {
//           console.log(quiz);
//           return quiz.userRate != null;
//         })
//         .map((quiz) => {
//           return quiz.userRate;
//         });
//       var questions = activeCategorySubmit.questions
//         .filter((quiz) => {
//           console.log(quiz);
//           return quiz.userRate != null;
//         })
//         .map((quiz) => {
//           return quiz.questionId;
//         });

//       //console.log("answers",answers);
//       var payload = {
//         userId: 45,
//         companyCode: "010",
//         accessToken: "97f914eb1ceb1867e3824f647f7e589b",
//         model: "updateAllQuestions",
//         companyId: "2",
//         evaluations: [
//           {
//             answer: `${answers.join()}`,
//             userId: "17",
//             evaluationId: "408",
//             question: `${questions.join()}`,
//           },
//         ],
//       };
//       console.log(payload);
//     },

//     submitEvaluation: () => {
//       var payload = {
//         userId: "45",
//         companyCode: "viz",
//         accessToken: "97f914eb1ceb1867e3824f647f7e589b",
//         model: "submitEvaluation",
//         companyId: 2,
//         evaluationId: 408,
//         evaluateeId: 17,
//       };
//       console.log(payload)
//       alert(":heart:");
//     },
//     answerSelected: function(question, activeCategory, index) {
//       var activeCategoryCopy = activeCategory;
//       var updatedQuiz = activeCategory.questions.map((quiz) => {
//         if (question.questionId == quiz.questionId) {
//           return {
//             ...quiz,
//             userRate: index,
//           };
//         } else {
//           return {
//             ...quiz,
//           };
//         }
//       });

//       activeCategoryCopy.questions = updatedQuiz;
//       this.activeCategory = activeCategoryCopy;
//       var categories = this.categories.map((category) => {
//         if (this.activeCategory.categoryId == category.categoryId) {
//           return {
//             ...activeCategory,
//           };
//         } else {
//           return {
//             ...category,
//           };
//         }
//       });
//       this.categories = categories;
//     },
//   },
//   computed: {
//     isLastQuiz: function() {
//       var currentIndex = this.categories.findIndex((category) => {
//         return this.activeCategory.categoryId == category.categoryId;
//       });
//       return currentIndex == this.categories.length - 1;
//     },
//     currentProgress: function() {
//       var index =
//         this.categories.findIndex((category) => {
//           return this.activeCategory.categoryId == category.categoryId;
//         }) + 1;
//       return index + " of " + this.categories.length;
//     },
//   },
//   mounted: function() {
//     fetch("evaluation.json?" + Date(), { method: "get" })
//       .then((response) => {
//         return response.json();
//       })
//       .then((reponse) => {
//         const categories = reponse.evaluationDetail.categories.map(
//           (category) => {
//             return {
//               ...category,
//               questions: category.questions.map((quiz) => {
//                 return {
//                   ...quiz,
//                   userRate: null,
//                 };
//               }),
//             };
//           }
//         );
//         this.categories = categories;
//         this.activeCategory = categories.length > 0 ? categories[0] : null;
//         console.log(categories[0].questions);
//       });
//   },
// };
</script>

<style>
/* * {
  margin: 0px;
}
.app {
  width: 100vw;
  margin: 0px;
  padding: 0px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.review_cointainer {
  width: 100%;
  height: 100%;
  background-color: yellowgreen;
}
.save__continue {
  background-color: grey;
  width: 100%;
  height: 20px;
  margin: 20px;
  justify-content: center;
  color: #55138e;
  display: flex;
}
.main__contentReview {
  height: 20px;
}
.question_cointainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.question_row {
  border-bottom: 1px solid grey;
  height: 15%;
  display: flex;
  align-items: center;
}
.question {
  flex: 0.7;
}
.question__rate {
  flex: 0.3;
  display: flex;
}
.progress__count_section {
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
  width: 30%;
}
.category {
  width: 10%;
  color: grey;
  margin: 30px;
}
.category_active {
  color: #55138e;
}
.category__list {
  color: #000;
  display: flex;
  align-items: center;

  height: 10%;
  width: 100%;
}
.header__bar {
  height: 10%;
  display: flex;
  align-items: center;
}
.content_area {
  display: flex;
  height: 90%;

  width: 100vw;
}

.category_top {
  background-color: #e5e5e5;
  width: 100%;
  display: flex;
  align-items: center;
  height: 10%;
}
.array__container {
  background-color: #55138e;
  height: 30px;
  width: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 20px;
}
.rating_circle {
  width: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 10px;
  height: 50px;
}
.rating_circle:hover {
  background-color: grey !important;
}
.rating_circle__active {
  background-color: #55138e !important;
}
.side__bar {
  margin: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  border-right: 1px solid grey;
  flex: 0.1;
  flex-direction: column;
  align-items: center;
  background-color: white;
}
.main__content {
  display: flex;
  flex-direction: column;
  flex: 0.9;
  background-color: white;
}
.arrow {
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  width: 15px;

  height: 15px;
  margin: 10px;
}
.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
.avator__box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  background-color: white;
  height: 20%;
}
.avator__box_active {
  background-color: grey !important;
}
.avator {
  height: 80px;
  border-radius: 50%;
  
  border: 2px solid grey;
  object-fit: contain;
  background-color: white;
  background-image: url("http://www.pngmart.com/files/3/Bill-Gates-PNG-Transparent-Image.png");
  background-repeat: no-repeat;
  margin-bottom: 20px;
  width: 80px;
} */
</style>
