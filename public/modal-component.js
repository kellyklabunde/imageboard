Vue.component("modal-component", {
    template: "#modal-component-template",
    props: ["imageId"],
    data: function () {
        return {
            image: {},
        };
    },
    mounted() {
        location.hash = this.imageId;

        this.imageInfo();
    },
    watch: {
        // this function will get called, whenever this.id (from props) changes
        imageId() {
            this.imageInfo();
        },
    },
    methods: {
        clicked() {
            this.$emit("clicked");
        },
        imageInfo() {
            axios.get(`/images/${this.imageId}`).then((response) => {
                this.image = response.data;
            });
        },
        handleNext() {
            console.log("clicked on next");
            location.hash = this.imageId - 1;
        },
        handlePrevious() {
            console.log("clicked on previous");
            location.hash = parseInt(this.imageId) + 1;
        },
    },
});
