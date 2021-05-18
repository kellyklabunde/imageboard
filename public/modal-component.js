Vue.component("modal-component", {
    template: "#modal-component-template",
    props: ["imageId"],
    data: function () {
        return {
            image: {},
            hideNext: true,
            hidePrevious: true,
        };
    },
    mounted() {
        location.hash = this.imageId;
        this.imageInfo();
        this.checkImageButton();
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
        checkImageButton() {
            if (this.imageId == 1) {
                this.hideNext = false;
            }
            if (this.imageId == 18) {
                this.hidePrevious = false;
            }
        },
        handleNext() {
            console.log("clicked on next");
            this.hidePrevious = true;
            if (this.imageId <= 2) {
                this.hideNext = false;
                location.hash = this.imageId - 1;
            } else {
                location.hash = this.imageId - 1;
            }
        },
        handlePrevious() {
            console.log("clicked on previous");
            this.hideNext = true;
            if (this.imageId >= 17) {
                this.hidePrevious = false;
                location.hash = parseInt(this.imageId) + 1;
            } else {
                location.hash = parseInt(this.imageId) + 1;
            }
            console.log("clicked on previous");
        },
    },
});
