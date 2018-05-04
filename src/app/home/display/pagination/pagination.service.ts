export class PaginationService {
    getPager(totalItems: number, currentPage: number, pageSize: number = 8) {
        // racunanje ukupnog broja stranica

        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // ako je ukupan br strnica manji ili jednak 10, onda ih prikazi sve
            startPage = 1;
            endPage = totalPages;
        } else {
            // ako ima vise od 10
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // racunaje koje stavke se prikazuju
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // niz brojeva starnica
        let pages = new Array(); 
        let i;
        for( i = startPage;  i < endPage+1; i++){
            pages.push(i);
        }
        
        return {
            currentPage: currentPage,
            totalPages: totalPages,
            pages: pages
        };
    }
}