"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

export const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function FadeUpDiv({ children, className, margin = "-50px" }: { children: React.ReactNode, className?: string, margin?: string }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin }}
            variants={fadeUpVariant}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeUpP({ children, className, margin = "-50px" }: { children: React.ReactNode, className?: string, margin?: string }) {
    return (
        <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin }}
            variants={fadeUpVariant}
            className={className}
        >
            {children}
        </motion.p>
    );
}

export function StaggerContainer({ children, className, margin = "-50px" }: { children: React.ReactNode, className?: string, margin?: string }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin }}
            variants={staggerContainer}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div variants={fadeUpVariant} className={className}>
            {children}
        </motion.div>
    );
}
