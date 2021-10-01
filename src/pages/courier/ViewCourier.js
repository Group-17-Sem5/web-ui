import View from "src/components/viewComponents/View";

export default function ViewCourier () {
    return(
        <View 
            title="Courier"
            url="/postMaster/courier/"
            updatePostmanUrl= "/postMaster/courier/updatePostman/"
            navigateUrl = "/app/viewCourier"
        />
    )
}