import View from "src/components/viewComponents/View";

export default function ViewCourier () {
    return(
        <View 
            title="Courier"
            url="/clerk/courier/"
            updatePostmanUrl= "/clerk/courier/updatePostman/"
            navigateUrl = "/dashboard/viewCourier"
        />
    )
}