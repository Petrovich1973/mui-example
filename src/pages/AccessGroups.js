import React from "react";
import GroupList from "../components/GroupList";
import Typography from "@material-ui/core/Typography";

export default function AccessGroups() {
    return (
        <div>
            <Typography variant="h6" component="h3" gutterBottom>
                Группы доступа к отчетам BackOffice для сотрудника Выгодин В.В.
            </Typography>
            <GroupList/>
        </div>
    )
}
