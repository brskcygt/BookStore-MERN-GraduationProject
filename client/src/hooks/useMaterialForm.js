import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function useMaterialForm({yupSchema,mode="onChange",defaultValues=false}={}){
    const resolver = yupSchema ? yupResolver(yupSchema) :false;
    const form = useForm({resolver,defaultValues,mode});

    return{
        form,
        registerValid:(name)=>{
            const {ref,...formRegister} = form.register(name);
            return({
                reference:ref,
                control:form.control,
                ...formRegister
            });
        }
    };
}