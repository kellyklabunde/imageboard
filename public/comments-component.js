Vue.component("comments-component", {
    template: "#comments-component-template",
    props: ["imageId"],
    data: function () {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },

    mounted() {
        console.log("MOUNTED");

        this.getComment();
    },
    watch: {
        imageId() {
            console.log("comment id just changed to", this.imageId);

            this.getComment();
        },
    },
    methods: {
        submitComment() {
            console.log("COMMENT SUBMITTED");
            console.log(this.comments);
            axios
                .post(`/comment`, {
                    comment: this.comment,
                    username: this.username,
                    imageId: this.imageId,
                })
                .then((response) => {
                    console.log("RESPONSE DATA", response.data);
                    this.comments.unshift(response.data);
                    this.comment = "";
                    this.username = "";
                });
        },
        getComment() {
            axios.get(`/comments/${this.imageId}`).then((response) => {
                console.log("response from GET /comments/:imageId", response);
                this.comments = response.data;
            });
        },
    },
});
