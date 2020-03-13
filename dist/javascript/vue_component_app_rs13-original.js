// RS13-Application
Vue.component('app-rs13', {
    props: {},
    created() {},
    computed: {
        sr_data() {
            // return data
            try {
                return this.$store.state.sr.data;
            } catch (e) {
                return [];
            };
        }
    },
    template: `
        <div>
            <div style="margin-bottom:24px;">
                <h3 class="font-weight-light">Erfassungen (<span v-html="sr_data.length"></span>)</h3>
                <v-divider></v-divider>
            </div>
            <div style="margin-bottom:24px;">
                <v-card class="mx-auto" outlined v-for="sr in sr_data" :key="sr.event_id">
                    <v-card-text v-if="sr.calculation_found">
                        <div>
                            <span>∑</span> Resilienz-Summenscore: <span
                                v-html="sr.calculation.resilienz_score.rs13_score"></span>
                        </div>
                        <p class="display-1 text--primary" v-html="formatDateCH(sr.date)">
                        </p>
                        <p>Interpretation</p>
                        <div class="text--primary" v-html="sr.calculation.resilienz_score.interpretation"></div>
                    </v-card-text>
                    <v-card-text v-else>
                        <div>Resilienz</div>
                        <p class="display-1 text--primary" v-html="formatDateCH(sr.date)">
                        </p>
                        <p>Hinweis</p>
                        <div class="text--primary">
                            Calculation noch nicht berechnet.
                        </div>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    `
});