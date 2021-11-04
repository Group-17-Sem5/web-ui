import View from "src/components/viewComponents/View";

export default function ViewMoneyorder () {
    return(
        <View 
            title="Money order"
            url="/postMaster/moneyorder/"
            // updatePostmanUrl= "/postMaster/moneyorder/updatePostman/"
            navigateUrl = "/app/viewMoneyOrders"
        />
    )
}