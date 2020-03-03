function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.roundToTwo = function(num) {
        // Round a Number to 0.X 
        return +(Math.round(num + "e+2") + "e-2");
    };


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(d) {

        var return_obj = {};

        var responses_array = d.survey_responses;
        var allResults = [];

        responses_array.forEach(function(response, myindex) {


            var myResults = {};
            var result = response.data.response;


            if (result.hasOwnProperty("TMTATime")) {
                result.tmt_a_error = result.TMTAError;
                result.tmt_a_time = result.TMTATime;
                result.tmt_b_error = result.TMTBError;
                result.tmt_b_time = result.TMTBTime;
                result.edu_years = result.Ausbildungsjahre;
                result.mz = result.Messzeitpunkt;
            };


            // Age & Edu
            myResults.birthdate = d.patient.data.birthdate

            var set_age = calc.getPatientAgeMz(d.patient.data.birthdate, response.data.filled);
            myResults.set_age = set_age;

            var edu_years = calc.roundToTwo(result.edu_years);
            myResults.edu_years = edu_years;


            // Erhebungszeitpunkt
            myResults.date = response.data.filled;
            
            if (result.hasOwnProperty("Erhebungsdatum")) {
                myResults.date = result.Erhebungsdatum;
            };
            


            // Zeit & Fehler in Integer
            myResults.TMTAError = parseInt(result.tmt_a_error);
            myResults.TMTBError = parseInt(result.tmt_b_error);
            myResults.TMTATime = parseInt(result.tmt_a_time);
            myResults.TMTBTime = parseInt(result.tmt_b_time);


            // Calculate Stuff
            myResults.quotient = calc.quotient(result);
            myResults.quotient_rounded = calc.roundToTwo(calc.quotient(result));
            myResults.percentile = calc.get_percentile(result, set_age, edu_years);

            // Messzeitpunkt
            var Messzeitpunkt = parseInt(result.mz);
            myResults.mz = Messzeitpunkt;

            var Messzeitpunkt_Text = 'Undefined';
            var Messzeitpunkt_Text_Quotient = 'Undefined';

            if (Messzeitpunkt === 1) {
                Messzeitpunkt_Text = 'Eintritt';
                Messzeitpunkt_Text_Quotient = Messzeitpunkt_Text + ' (B/A: ' + myResults.quotient_rounded + ')';
            };
            if (Messzeitpunkt === 2) {
                Messzeitpunkt_Text = 'Austritt';
                Messzeitpunkt_Text_Quotient = Messzeitpunkt_Text;
            };
            if (Messzeitpunkt === 3) {
                Messzeitpunkt_Text = 'Anderer Messzeitpunkt';
                Messzeitpunkt_Text_Quotient = Messzeitpunkt_Text;
            };

            var mz_obj = {
                "Messzeitpunkt": Messzeitpunkt,
                "Messzeitpunkt_Text": Messzeitpunkt_Text,
                "Messzeitpunkt_Text_Quotient": Messzeitpunkt_Text_Quotient
            };

            myResults.Messzeitpunkt = mz_obj;

            // Write Results for the Return
            // Do not modify stuff here
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            // myResults.d = d;

            myResults.version = "19. Oktober 2016";

            allResults.push(myResults);

        });

        return_obj.responses_array = responses_array;
        return_obj.allResults = allResults;
        return_obj.full = d;

        return allResults;
    };


    // Return
    // return calc.getResults(responses);
    return responses;
}
