Vue.component("optinomic-content-block",{props:{title:{type:String,default:"Optinomic"},subtitle:{type:String,default:""},id:{type:String,default:"id_undefined"},show_in_toc:{type:Boolean,default:!0},toc_pushed:{type:Boolean,default:!1}},data:()=>({}),created(){if(!1===this.toc_pushed&&!0===this.show_in_toc){var toc=this.$store.state.table_of_contents.slice(0),toc_entry={title:this.title,subtitle:this.subtitle,id:this.id};toc.push(toc_entry),this.toc_pushed=!0,this.$store.commit({type:"saveData",root:"table_of_contents",data:toc})}},computed:{},template:'\n        <div class="mb-6 pt-8" :id="id">\n            <div class="d-flex flex-row justify-space-between align-end">\n                <div>\n                    <p class="overline" style="margin-left:1px;color:#8b0042" v-html="subtitle"></p>\n                    <h2 class="headline font-weight-light text--secondary" v-html="title" style="margin-top:-16px"></h2>\n                </div>\n                <div>\n                    <v-btn icon x-small color="#8b0042" @click="$vuetify.goTo(\'#top\')">\n                        <v-icon dark>mdi-arrow-up</v-icon>\n                    </v-btn>\n                </div>\n            </div>\n            <v-divider></v-divider>\n            <div class="mt-6 mb-4">\n                <slot></slot>\n            </div>\n        </div>\n    '});