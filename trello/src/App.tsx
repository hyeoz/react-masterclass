import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const App = () => {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {/* Droppable, Draggable 의 children 은 함수형태여야 함! */}
          {/* provided / magic 등으로 불림 */}
          {/* drag and drop 사용할 때 필용한 props 를 다 적을 필요 없이 설정할 수 있도록 해줌 */}
          {(magic) => {
            return (
              <ul {...magic.droppableProps} ref={magic.innerRef}>
                <Draggable draggableId="first" index={0}>
                  {(provided) => (
                    <li {...provided.draggableProps} ref={provided.innerRef}>
                      <span {...provided.dragHandleProps}>🔥</span>
                      first
                    </li>
                  )}
                </Draggable>
                <Draggable draggableId="second" index={1}>
                  {(provided) => (
                    <li {...provided.draggableProps} ref={provided.innerRef}>
                      <span {...provided.dragHandleProps}>🔥</span>
                      second
                    </li>
                  )}
                </Draggable>
              </ul>
            );
          }}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default App;
