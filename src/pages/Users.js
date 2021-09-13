import React from "react";
import UsersList from "../components/UsersList";
import Typography from "@material-ui/core/Typography";

export default function Users() {
    return (
        <div>
            <Typography variant="h6" component="h3" gutterBottom>
                Поьзователи АС BackOffice
            </Typography>
            <UsersList/>
        </div>
    )
}
