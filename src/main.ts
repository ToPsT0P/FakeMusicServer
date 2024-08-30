import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";


const start = async () => {
    try {
        const PORT =  5000;
        const app = await NestFactory.create(AppModule)
        app.enableCors()
        await app.listen(PORT, () => console.log(`servers started on port ${PORT}`));
    }catch(e){
        console.log(e)
    }
}

start()