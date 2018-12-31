// Icons are from http://chittagongit.com/


/**
 * This function Will accept an answerId and a warning message and will blur the answer and shows the warning message over the answer
 * @param answerIdToHide
 * @param warningMessage
 */
function hideAnswer(answerIdToHide, warningMessage) {
    const answerIdSelector = '#answer-' + answerIdToHide;
    $(answerIdSelector).wrapAll('<div class="vuln-codesnippet"></div>');
    $(answerIdSelector).parent().append("" +
        "<div class='warning'>" +
        "<div class='header-icon'> </div>" +
        "<h3>This answer contains a vulnerable code snippet!</h3>" +
        "<p>" +
        warningMessage +
        "</p>" +
        "<button class='seecode clc-cp-sb--tall clc-cp-sb-learnmore clc-cp-sb-learnmore-button'>Okay, I just wanna see this code</button>" +
        " </div>");

    $('.seecode').on('click', function () {
        const $vuln_cs = $(this).parent();
        $vuln_cs.addClass('animated bounceOut');
        $vuln_cs.prev().css('filter', 'blur(0px)');

    });
}


//To optimize extension speed, We'll first find Question ID from URL using `indexOf` since it's faster than `regex`:
const URL = document.location.href;

if (URL.startsWith('https://stackoverflow.com/questions/')) {
    // length of 'https://stackoverflow.com/questions/' is 36. So we'll search from 36-th character until '/'
    const START_INDEX_OF_QUESTION_ID_IN_URL = 36;
    const END_INDEX_OF_QUESTION_ID_IN_URL = URL.indexOf('/', START_INDEX_OF_QUESTION_ID_IN_URL);
    const QUESTION_ID = Number(URL.substring(START_INDEX_OF_QUESTION_ID_IN_URL, END_INDEX_OF_QUESTION_ID_IN_URL));

    //Now let's see if there is actually a vulnerable answer in this question using HashTable and our hardcoded vulnerable answers.
    //Keys of an Object in Javascript use HashTable under the hood with o(1) lookup time.
    //1th level keys of this object contain Question ids
    //Inside each QuestionId is an array of answers with AnswerId as key and Warning message as value

    const QUESTION_IDS_WITH_VULN_ANSWERS = {
        3209790:
            {
                // 3227225: "Message about this vulnerability ... <br> In html format! <br> <a href='http://google.com'> Link </a>",
                31169390: "Message about this vulnerability ... <br> In html format! <br> <a href='http://google.com'> Link </a>",
            }
    };


    //If this questionId is listed in our analysis to have at least one vulnerable answer
    if (QUESTION_ID in QUESTION_IDS_WITH_VULN_ANSWERS) {

        //For each answer vulnerable answer in our results object
        Object.keys(QUESTION_IDS_WITH_VULN_ANSWERS[QUESTION_ID]).map((answerIdToHide) => {
                //Hide the answer
                const warningMessage = QUESTION_IDS_WITH_VULN_ANSWERS[QUESTION_ID][answerIdToHide];
                hideAnswer(answerIdToHide, warningMessage);
        });
    }
}
