import { useState } from 'react';

function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	const transition = (mode, replace = false) => {
		if (!replace) {
			setHistory([...history, mode]);
		} else {
			const newHistory = history.slice(0, -1);
			setHistory([...newHistory, mode]);
		}
		setMode(mode);
	};

	const back = () => {
		if (history.length > 1) {
			const newHistory = history.slice(0, -1);
			setHistory(newHistory);
			setMode(newHistory[newHistory.length - 1]);
		}
	};

	return { mode, transition, back };
}

export default useVisualMode;
