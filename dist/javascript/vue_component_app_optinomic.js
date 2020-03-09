Vue.component("app-optinomic",{props:{title:{type:String,default:"Optinomic"},subtitle:{type:String,default:"App"}},created(){this.$store.dispatch("getSurveyResponses")},computed:{sr(){return null===this.$store.state.sr?null:this.$store.state.sr},missing_data(){if(null===this.$store.state.sr)return!1;var data_errors=!1;return this.$store.state.sr.data.forEach(function(item){!1===item.all_found&&(data_errors=!0)}),data_errors}},template:'\n        <v-app>\n            <v-content>\n                <v-container>\n                    <app-title :subtitle="subtitle" :title="title"></app-title>\n                    <div v-if="sr.have_data">\n                        <div v-if="missing_data" class="mb-2">\n                            <h2 class="font-weight-light">Hinweis</h2>\n                            <v-divider></v-divider>\n                        </div> \n                        <div v-for="r in sr.data">\n                            <div v-if="r.all_found === false">\n                                <v-alert dense outlined text type="error">\n                                    <p style="margin:0;padding:0">Bei der Messung vom <span v-html="formatDateCH(r.date)"></span> sind nicht alle Daten vorhanden:</p>\n                                    <p style="margin:0;padding:0" v-if="r.calculation_found === false">\n                                        - Calculation nicht gefunden / noch nicht berechnet!\n                                    </p>\n                                    <p style="margin:0;padding:0" v-if="r.event_found === false">\n                                        - Event <span v-html="r.event_id"></span> nicht gefunden.\n                                    </p>\n                                    <p style="margin:0;padding:0" v-if="r.patient_found === false">\n                                        - Patient <span v-html="r.patient_id"></span> nicht gefunden.\n                                    </p>\n                                    <p style="margin:0;padding:0" v-if="r.stay_found === false">\n                                        - Fall <span v-html="r.stay_id"></span> nicht gefunden.\n                                    </p>\n                                </v-alert>\n                            </div>\n                        </div>\n                        <slot></slot>\n                    </div>\n                    <div v-else>\n                        <v-alert prominent text type="error">\n                            Keine Daten vorhanden.\n                        </v-alert>\n                    </div>\n                </v-container>\n            </v-content>\n        </v-app>\n    '});