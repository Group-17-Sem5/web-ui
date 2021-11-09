import View from "src/components/viewComponents/View";

export default function ViewMoneyOrder () {
    return(
        <View 
            title="Money order"
            url="/clerk/moneyorder/"
            updatePostmanUrl= "/clerk/moneyorder/updatePostman/"
            navigateUrl = "/dashboard/viewMoneyOrders"
        />
    )
}