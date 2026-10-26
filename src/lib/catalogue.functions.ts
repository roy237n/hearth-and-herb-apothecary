import { createServerFn } from '@tanstack/react-start';
import { loadStorefront } from './catalogue.server';
export const getStorefront=createServerFn({method:'GET'}).handler(()=>loadStorefront());
