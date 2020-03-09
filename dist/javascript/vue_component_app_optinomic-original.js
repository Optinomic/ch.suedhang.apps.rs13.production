// Optinomic App-Optinomic
Vue.component('app-optinomic', {
    props: {
        title: {
            type: String,
            default: "Optinomic"
        },
        subtitle: {
            type: String,
            default: "App"
        }
    },
    created(){
        this.$store.dispatch('getSurveyResponses');
    },
    computed: {
        sr () {
            // get survey_response
            if (this.$store.state.sr === null) {
                return null;
            } else {
                return this.$store.state.sr;
            };
        }
    },
    template: `
        <v-app>
            <v-content>
                <v-container>
                    <app-title :subtitle="subtitle" :title="title"></app-title>
                    <div v-if="sr.have_data">
                        <div v-for="r in sr.data">
                            <div v-if="r.all_found === false">
                                <v-alert dense outlined text type="error" dismissible>
                                    <p style="margin:0;padding:0">Nicht alle Daten vorhanden:</p>
                                    <p style="margin:0;padding:0" v-if="r.calculation_found === false">
                                        - Calculation nicht gefunden / noch nicht berechnet!
                                    </p>
                                    <p style="margin:0;padding:0" v-if="r.event_found === false">
                                        - Event <span v-html="r.event_id"></span> nicht gefunden.
                                    </p>
                                    <p style="margin:0;padding:0" v-if="r.patient_found === false">
                                        - Patient <span v-html="r.patient_id"></span> nicht gefunden.
                                    </p>
                                    <p style="margin:0;padding:0" v-if="r.stay_found === false">
                                        - Fall <span v-html="r.stay_id"></span> nicht gefunden.
                                    </p>
                                </v-alert>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <v-alert prominent text type="error" dismissible>
                            Keine Daten vorhanden.
                        </v-alert>
                    </div>
                    <slot></slot>
                </v-container>
            </v-content>
        </v-app>
    `
});