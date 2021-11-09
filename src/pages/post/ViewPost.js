import View from "src/components/viewComponents/View";

export default function ViewPost () {
    return(
        <View 
            title="Mail"
            url="/clerk/post/"
            updatePostmanUrl= "/clerk/post/updatePostman/"
            navigateUrl = "/dashboard/viewPost"
        />
    )
}