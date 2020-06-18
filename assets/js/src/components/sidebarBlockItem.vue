<template>
    <div class="sidebar-block-item" :class="classname" v-if="value.length !== 0">
        <div class="sidebar-block-item__title sidebar-block-item__title--toggle filter-categories-name" :class="{ 'is-collapsed': collapsed, 'is-expanded': expanded }" v-on:click="collapseFields">
            <span class="name-block">{{ title }}</span>
            <tooltip v-if="tooltip" :show="false" color="747474" >{{tooltip}}</tooltip>
                <svg width="15" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9l6.5-7L14 9" stroke="#333" stroke-width="2"/></svg>
        </div>
        <transition-group name="sidebar-block-item-field" tag="div" class="sidebar-block-item-fields" :class="{ 'is-collapsed': collapsed, 'is-expanded': expanded }">
            <div class="sidebar-block-item-field control-group" v-for="(item, index) in value" :key="item.name">
                <label class="control control-checkbox">
                    {{ item.name }}
                    <input type="checkbox" :value="item.slug" v-model="checkedItems" :aria-label='item.name'>
                    <div class="control_indicator"></div>
                    <span class="sidebar-block-item-field__title"></span>
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