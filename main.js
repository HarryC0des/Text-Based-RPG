export function reducer(state,action,gameSteps){
    switch(action.type){
        case "START":
            return{...state};

    case "CHOOSE":{
        const {choice} = action; //"A" 0r "B"
        const choiceKey = `choice${choice}`;
        const step = gameSteps[state.stepKey];
        const nextKey = step?.[choiceKey]?.next;

        if (!nextKey || !gameSteps[nextKey]){
            return{...state};//invalid -> no change
        }
        const nextStep = gameSteps[nextKey];

        const newState = {
            ...state,
            stepKey: nextKey,
            health: state.health + (nextStep.healthChange ?? 0),
            inventory:[...state.inventory, ...(nextStep.rewards ?? [])],
            history: [...(state.history ?? []), nextKey]
        };
        return newState;
        }
        default:
            return state;
    }
    }
