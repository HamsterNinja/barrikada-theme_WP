<template>
    <div class="sidebar-block-item" :class="classname" v-if="value.length !== 0">
        <div class="sidebar-block-item__title sidebar-block-item__title--toggle">
            <span class="name-block">{{ title }}</span>
            <tooltip v-if="tooltip" :show="false" color="747474" >{{tooltip}}</tooltip>
            <button class="button button--sidebar-block-item-title" aria-label="Раскрыть" v-on:click="collapseFields">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 160 160" :class="{ 'minus': !collapsed, 'plus': collapsed }">
                    <path d="M70 0h20v160H70z" class="vertical-line"/>
                    <path d="M0 70h160v20H0z" class="horizontal-line"/>
                </svg>
            </button>
        </div>
        <transition-group name="sidebar-block-item-field" tag="div" class="sidebar-block-item-fields" :class="{ 'is-collapsed': collapsed, 'is-expanded': expanded }">
            <div class="sidebar-block-item-field" v-for="(item, index) in value" :key="item.name">
                <label class="container-checkbox">
                    <input type="checkbox" :value="item.slug" v-model="checkedItems" :aria-label='item.name'>
                    <span class="checkmark"></span>
                    <span class="sidebar-block-item-field__image" :style="[item.image ? {marginRight: '6px'} : {marginRight: '0px'}]">
                        <img v-if="item.image" :src="item.image" alt="">         
                    </span>
                    <span class="sidebar-block-item-field__title">{{ item.name }}</span>
                    <span class="sidebar-block-item-field__count"></span>
                </label>
            </div>
        </transition-group>
        <!-- <transition name="fade">
            <div class="loader-overlay-small" v-if="value.length == 0">
                <div class="loader-small"></div>
            </div>
        </transition> -->
        <button v-if="value.length > 4" class="button sidebar-block-item-fields__more" v-on:click="expandFields">{{ moretitle }}</button>
    </div>
</template> 


<script>
export default {
    props: {
        title: String,
        classname: String,
        tooltip: String,
        value: Array,
        storevalue: String,
        vcollapsed: {
            type: Boolean,
            default: false
        },
        vexpanded: {
            type: Boolean,
            default: false
        },
        vismobile: {
            type: Boolean,
            default: false
        },
        moretitle: {
            type: String,
            default: 'Смотреть еще'
        },
    },
    data() {
        return {
            template_url: SITEDATA.themepath,
            collapsed: this.vcollapsed,
            expanded: this.vexpanded,
            ismobile: this.vismobile,
        }
    },
    computed: {
        checkedItems: {
            get () {
                return this.$store.state[this.storevalue]
            },
            set (value) {
                let methodName = 'update' + this.storevalue.charAt(0).toUpperCase() + this.storevalue.slice(1);
                this.$store.commit(methodName, value);
                this.$root.applyFilter();
            }
        },
    },
    methods: {
        collapseFields: function () {
            this.collapsed = !this.collapsed;
        },
        expandFields: function () {
            this.expanded = !this.expanded;
        },
    },
}
</script>