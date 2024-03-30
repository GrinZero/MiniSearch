import { useEffect, useRef, FormEvent, useState, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { getRandomQuerySuggestion } from "../modules/querySuggestions";

export function SearchForm({
  query,
  updateQuery,
}: {
  query: string;
  updateQuery: (query: string) => void;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const windowInnerHeight = useWindowInnerHeight();
  const [suggestedQuery, setSuggestedQuery] = useState<string>(
    getRandomQuerySuggestion(),
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const userQueryIsBlank = event.target.value.trim().length === 0;
    const suggestedQueryIsBlank = suggestedQuery.trim().length === 0;

    if (userQueryIsBlank && suggestedQueryIsBlank) {
      setSuggestedQuery(getRandomQuerySuggestion());
    } else if (!userQueryIsBlank && !suggestedQueryIsBlank) {
      setSuggestedQuery("");
    }
  };

  const startSearching = useCallback(() => {
    let queryToEncode = suggestedQuery;

    if (textAreaRef.current && textAreaRef.current.value.trim().length > 0) {
      queryToEncode = textAreaRef.current.value;
    }

    window.history.pushState(
      null,
      "",
      `/?q=${encodeURIComponent(queryToEncode)}`,
    );

    updateQuery(queryToEncode);

    location.reload();
  }, [suggestedQuery, updateQuery]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startSearching();
  };

  useEffect(() => {
    const keyboardEventHandler = (event: KeyboardEvent) => {
      if (event.code === "Enter" && !event.shiftKey) {
        event.preventDefault();
        startSearching();
      }
    };
    const textArea = textAreaRef.current;
    textArea?.addEventListener("keypress", keyboardEventHandler);
    return () => {
      textArea?.removeEventListener("keypress", keyboardEventHandler);
    };
  }, [startSearching]);

  return (
    <div
      style={
        query.length === 0
          ? {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: windowInnerHeight * 0.8,
            }
          : undefined
      }
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextareaAutosize
          defaultValue={query}
          placeholder={suggestedQuery}
          ref={textAreaRef}
          onChange={handleInputChange}
          autoFocus
          minRows={1}
          maxRows={6}
        />
        <button type="submit" style={{ width: "100%" }}>
          Search
        </button>
      </form>
    </div>
  );
}

function useWindowInnerHeight() {
  const [windowInnerHeight, setWindowInnerHeight] = useState(
    window.innerHeight,
  );

  useEffect(() => {
    const handleResize = () => setWindowInnerHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowInnerHeight;
}
