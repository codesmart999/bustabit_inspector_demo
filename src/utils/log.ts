import { LogType } from "@/types";

type Styles = {
  [key in LogType]: string;
}

export const log = (text:string, type: LogType = "default") => {
  const styles: Styles = {
    'default': 'color: black',
    'info': 'color: green; font-weight: bold',
    'warning': 'color: pink; font-weight: bold',
    'error': 'color: red; font-weight: bold'
  };

  if (type == "error") {
    console.error(text);
  } else {
    console.log('%c' + text, styles[type]);
  }
};