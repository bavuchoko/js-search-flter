import { useEffect, RefObject } from 'react';

export default function useDragScroll(refs: RefObject<HTMLElement | null>[]) {
    useEffect(() => {
        if (!refs.length) return;

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;
        let activeElement: HTMLElement | null = null;


        const onMouseDown = (e: MouseEvent) => {
            for (const ref of refs) {
                if (ref.current?.contains(e.target as Node)) {
                    isDragging = true;
                    startX = e.pageX;
                    scrollLeft = ref.current.scrollLeft;
                    activeElement = ref.current;

                    document.body.style.cursor = 'grabbing';
                    document.body.style.userSelect = 'none';
                    break;
                }
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging || !activeElement) return;

            const x = e.pageX;
            const walk = (x - startX) * 1.5;
            activeElement.scrollLeft = scrollLeft - walk;
        };

        const onMouseUp = () => {
            if (!isDragging) return;

            isDragging = false;
            activeElement = null;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [refs]);
}
