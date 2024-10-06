import express from "express";

const app = express();

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening at http://localhost:3000`);
});

