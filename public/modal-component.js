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
            if (this.imageId <= 1) {
                console.log("it is bigger!!!");
                // chamar para sumir botao direito
            } else {
                location.hash = this.imageId - 1;
            }
        },
        handlePrevious() {
            console.log("clicked on previous");
            if (this.imageId >= 18) {
                console.log("it is smaller!!!");
                // chamar para sumir botao esquerdo
            } else {
                location.hash = parseInt(this.imageId) + 1;
            }
        },
    },
});
