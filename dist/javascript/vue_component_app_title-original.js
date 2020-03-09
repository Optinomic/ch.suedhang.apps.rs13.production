// Optinomic App-Header
Vue.component('app-title', {
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
        this.$store.dispatch('getApps');
    },
    computed: {
        readme_html () {
            if (this.$store.state.current_app === null) {
                return '<h1>Loading</h1>'
            } else {
                return this.$store.state.current_app.module.readme.html;
            };
        }
    },
    template: `
        <div style="margin-bottom:24px;">
            <h1 v-html="title" class="display-2 font-weight-thin"></h1>
            <p v-html="subtitle" style="margin-left:3px"></p>
            <v-divider></v-divider>
        
            <v-expansion-panels flat light tile>
                <v-expansion-panel>
                    <v-expansion-panel-header style="padding:0">
                        <h2 class="font-weight-light">Dokumentation (Readme)</h2>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div v-html="readme_html"></div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    `
});