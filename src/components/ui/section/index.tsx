'use client'
import { useState, useEffect } from 'react';
import styles from './section.module.scss';

export const useSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    function getSections() {
        return Array.from(document.querySelectorAll('.Section'));
    }

    function scrollToSection(index: number) {
        const sections = getSections();
        const section = sections[index];
        section.scrollIntoView({ behavior: 'smooth' });
    }

    function isAtTop(el: any) {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0;
    }

    function scrollHandler(e: any) {
        const sections = getSections();
        const currentSection = sections.find(isAtTop);
        if (currentSection !== undefined)
            setCurrentIndex(sections.indexOf(currentSection));
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
    }, []);

    // console.log('rendersection')

    return { currentIndex, scrollToSection };
}

export const Section = ({ id, children, isActive }: { id: string, isActive?: boolean, children: any }) => (
    <div className={styles.Section + ' Section'} id={id}>{children}</div>
);
