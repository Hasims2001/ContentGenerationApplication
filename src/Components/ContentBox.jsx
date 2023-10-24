import {
  Box,
  Button,
  Flex,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import { reducer } from "../Api/reducer";
import { postLanguageTranslation, postTextGenerator, postTextSummariz } from "../Api/api";
import  HistoryBox  from "./HistoryBox";

const init = {
    loading: false,
    error: "",
    output: "Your output will be here...",
  };
export const ContentBox = () => {
  const [state, dispatch] = useReducer(reducer, init);
  const { loading, error, output } = state;
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || [])
  const toast = useToast();
  const [current, setCurrent] = useState('Text Generate');
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
          let data = [
            ...history,
            {
              type: type.value,
              query: query.value,
              content: response.msg,
            }
          ];
          localStorage.setItem('history', JSON.stringify(data));
          setHistory(data);   
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
     <Flex mt={12}>
      <Stack gap={0} >
        <Button onClick={(e)=> setCurrent(e.target.value)} colorScheme={current === "Text Generate" ? "green" : "blue"} borderRadius={'.5rem 0 0 0 '} value={'Text Generate'}>Text Generate</Button>
        <Button  onClick={(e)=> setCurrent(e.target.value)} colorScheme={current === "Text Summariz" ? "green" : "blue"} borderRadius={'none'} value={'Text Summariz'}>Text Summariz</Button>
        <Button  onClick={(e)=> setCurrent(e.target.value)} colorScheme={current === "Language Translation" ? "green" : "blue"} borderRadius={'0 0 0 .5rem'} value={"Language Translation"}>Language Translation</Button>
      </Stack>
      <Box>
      <HistoryBox history={history} current={current} />
      </Box>
     </Flex>
    </Box>
  );
};
