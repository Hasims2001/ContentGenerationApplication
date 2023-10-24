import {
  Box,
  Button,
  Flex,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useReducer } from "react";
import { reducer } from "../Api/reducer";
import { postLanguageTranslation, postTextGenerator, postTextSummariz } from "../Api/api";

const init = {
    loading: false,
    error: "",
    output: "Your output will be here...",
  };
export const ContentBox = () => {
  const [state, dispatch] = useReducer(reducer, init);
  const { loading, error, output } = state;

  const toast = useToast();
  const handleSubmit = async () => {
    let query = document.querySelector("#query");
    let type = document.querySelector("#type");
    if (!query.value) {
      toast({
        title: "Please write your query...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      // dispatch({type: "ERROR", payload: "Please write your query..."})
    } else if (!type.value) {
      toast({
        title: "Please select type...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      // dispatch({type: "ERROR", payload: "Please select type..."})
    } else {
        dispatch({type: "LOADING"});
        let response;
        if(type.value === "Text Generate"){
            response = await postTextGenerator(query.value);
        }else if(type.value === "Text Summariz"){
            response = await postTextSummariz(query.value);
        }else if(type.value === "Language Translation"){
            response = await postLanguageTranslation(query.value);
        }else{
            toast({
                title: "Please choose correct type...",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
        }
       
        if(response.issue){
            dispatch({type: "ERROR", payload: response.msg});
        }else{
            dispatch({type: "OUTPUT", payload: response.msg});
        }

    }
  };

  if (error !== "") {
    toast({
      title: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
  return (
    <Box>
      <Flex gap={10} mb={10}>
        <Textarea
          id="query"
          rows={10}
          placeholder="write here (max 500 characters)...."
          maxLength={"500"}
        />
        <Textarea
          rows={10}
          fontWeight={'bold'}
          value={output}
          readOnly
        />
      </Flex>
      <Stack gap={10}>
        <Select id="type" w={"fit-content"}>
          <option value={""}>Select Type</option>
          <option value={"Text Generate"}>Text Generate</option>
          <option value={"Text Summariz"}>Text Summariz</option>
          <option value={"Language Translation"}>Language Translation</option>
        </Select>
        <Button w={"fit-content"} onClick={handleSubmit} colorScheme="blue">
          {!loading ? "Submit" : "Loading..."}
        </Button>
      </Stack>
    </Box>
  );
};
