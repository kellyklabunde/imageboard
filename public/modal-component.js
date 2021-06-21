Vue.component("modal-component", {
    template: "#modal-component-template",
    props: ["imageId"],
    data: function () {
        return {
            image: {},
            hideNext: true,
            hidePrevious: true,
            latestImage: 1,
        };
    },
    mounted() {
        location.hash = this.imageId;
        this.imageInfo();
        this.getLatestImage();
        // this.checkImageButton();
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
        getLatestImage() {
            axios.get("/showlatestimage").then((response) => {
                this.latestImage = response.data[0].id;
                if (this.imageId == 1) {
                    this.hideNext = false;
                }
                if (this.imageId == this.latestImage) {
                    this.hidePrevious = false;
                }
            });
        },
        // checkImageButton() {
        //     console.log("check image button");
        //     console.log(this.latestImage);
        //     console.log(this.imageId);
        //     if (this.imageId == 1) {
        //         this.hideNext = false;
        //     }
        //     if (this.imageId == this.latestImage) {
        //         this.hidePrevious = false;
        //     }
        // },
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
            if (this.imageId >= this.latestImage) {
                this.hidePrevious = false;
                location.hash = parseInt(this.imageId) + 1;
            } else {
                location.hash = parseInt(this.imageId) + 1;
            }
        },
    },
});
