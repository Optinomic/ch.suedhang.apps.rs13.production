Vue.component("optinomic-toc",{props:{},computed:{toc_data(){try{return this.$store.state.table_of_contents}catch(e){return[]}}},template:'\n        <div class="d-flex flex-row justify-start">\n            <div class="mb-12 mt-2">\n                <div class="ml-5 mb-2">\n                    <p class="overline" style="color:#8b0042">Table of Contents</p>\n                    <h2 class="headline font-weight-light text--secondary" style="margin-top:-22px">Inhaltsverzeichnis</h2>\n                </div>\n                <p class="d-flex flex-row align-top" v-for="item in toc_data" :key="item.id" style="margin:0">\n                    <span class="body-1 font-weight-black" style="color:#8b0042">-</span>\n                    <a style="color:#212121" class="ml-3" @click="$vuetify.goTo(\'#\'+item.id)">\n                        <v-tooltip left>\n                            <template v-slot:activator="{ on }">\n                                <span v-on="on" class="body-1 font-weight-light" v-text="item.title"></span>\n                            </template>\n                            <span class="caption mx-1" v-text="item.subtitle"></span>\n                        </v-tooltip>\n                    </a>\n                </p>\n            </div>\n        \n        </div>\n    '});