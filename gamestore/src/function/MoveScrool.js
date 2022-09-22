import { useRef } from 'react';

//hook
function useMoveScrool() {
  const element = useRef(null);
  const onMoveToElement = () => {
    element.current?.scrollIntoView();
  };
  return [element, onMoveToElement];
}

export default useMoveScrool;