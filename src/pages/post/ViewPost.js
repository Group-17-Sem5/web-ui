import View from "src/components/viewComponents/View";

export default function ViewPost () {
    return(
        <View 
            title="Post"
            url="/postMaster/post/"
            updatePostmanUrl= "/postMaster/post/updatePostman/"
            navigateUrl = "/app/viewPost"
        />
    )
}