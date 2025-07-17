export function RemoveAccents(phrases = '') {
    return phrases
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(':', '')
        .replace(/Đ/g, 'D')
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .join(' ');
}

export function EscapeRegex(phrases = '') {
    return phrases.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function NormalizeAndEscape(phrases = '') {
    return EscapeRegex(RemoveAccents(phrases));
}
