console.log("SANITY CHECK");

new Vue({
    el: "#main",
    data: {
        images: [],
        hideButton: false,
        title: "",
        username: "",
        description: "",
        file: null,
        selectedImage: location.hash.slice(1),
        formVisible: false,
        more: false,
    },

    mounted() {
        console.log("OUR VUE APPLICATION MOUNTED");

        axios.get("/images").then((response) => {
            console.log("response from GET /images", response);
            this.images = response.data;
        });

        window.addEventListener("hashchange", () => {
            console.log(location.hash);
            this.selectedImage = location.hash.slice(1);
        });
    },
    watch: {
        images: function () {
            const oldestImage = this.images[this.images.length - 1];

            this.more = oldestImage.id !== oldestImage.lowestid;
        },
    },
    methods: {
        loadMoreImages() {
            const lastId = this.images[this.images.length - 1].id;

            axios.get(`/images/more?lastId=${lastId}`).then((result) => {
                this.images.push(...result.data);
                if (lastId == 1) {
                    console.log("inside if block");
                    // this.hideButton = true;
                }
            });
        },

        handleSubmit(e) {
            console.log("FORM SUBMITTED");
            console.log("title: ", this.title);
            console.log("description: ", this.description);
            console.log("username: ", this.username);
            console.log("file: :", this.file);

            const fd = new FormData();

            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            fd.append("image", this.file);

            axios.post("/upload", fd).then((response) => {
                console.log("response", response.data[0]);
                this.images.unshift(response.data[0]);
            });
        },

        handleChange(e) {
            console.log("NEW IMAGE SELECTED");

            console.log("e.target.files[0]", e.target.files[0]);

            this.file = e.target.files[0];
        },
        handleImageClick(imageId) {
            console.log("CLICKED ON ANY OF THE IMAGES", imageId);
            this.selectedImage = imageId;
        },
        handleClose() {
            console.log("handleClose");
            this.selectedImage = null;
            location.hash = "";
        },
        showForm() {
            this.formVisible = true;
        },
    },
});
