import { FC, useState, useEffect } from "react";
import Lefter from "../resources/svg/Lefter";
import Righter from "../resources/svg/Righter";
import { Page } from "../type/Types";

interface PaginationProps {
    page?: Page;
    onPageChange?: (clickPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({ page, onPageChange }) => {
    const [inputValue, setInputValue] = useState(String((page?.currentPage ?? 0) + 1));

    useEffect(() => {
        setInputValue(String((page?.currentPage ?? 0) + 1));
    }, [page?.currentPage]);

    const onPageHandler = (value: number) => {
        const zeroBasedValue = value - 1;
        if (zeroBasedValue === page?.currentPage) return;
        if (value === (page?.totalPages ?? 1) && Number(inputValue) === (page?.totalPages ?? 1) ) return;
        onPageChange?.(zeroBasedValue);
    };

    const handleButtonClick = (val: number) => {
        if (!page) return;

        // clamp
        if (val < 1) val = 1;
        if (val > (page?.totalPages ?? 0)) val = (page?.totalPages ?? 0);

        onPageHandler(val);
        setInputValue(String(val));
    };

    const handleInputChange = (val: string) => {
        setInputValue(val);
    };

    const handleInputBlur = () => {
        let val = Number(inputValue);
        if (isNaN(val) || val < 1) val = 1;
        if (val > (page?.totalPages ?? 1)) val = page?.totalPages ?? 1;

        onPageHandler(val);
        setInputValue(String(val));
    };

    return (
        <>
            {page && (
                <div
                    style={{
                        height: "30px",
                        backgroundColor: "var(--jf-lightGray)",
                        borderColor: "var(--jf-deepGray)",
                        lineHeight: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "5px 15px",
                        }}
                    >
                        <div style={{ display: "flex" }}>
                            <Lefter onClick={() => handleButtonClick(Number(inputValue) - 1)} />
                            <div
                                style={{
                                    marginLeft: "10px",
                                    marginRight: "15px",
                                    display: "flex",
                                }}
                            >
                                <input
                                    type="number"
                                    style={{
                                        border: "1px solid",
                                        borderRadius: "3px",
                                        borderColor: "var(--jf-deepGray)",
                                        textAlign: "right",
                                        fontSize: "12px",
                                        marginRight: "15px",
                                        width: "40px",
                                        height: "20px",
                                        boxSizing: "border-box",
                                    }}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    value={inputValue}
                                    onFocus={(e) => e.target.select()}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            (e.target as HTMLInputElement).blur();
                                        }
                                    }}
                                    onBlur={handleInputBlur}
                                />
                                <p
                                    style={{ fontSize: "13px", height: "20px", margin: "0" }}
                                    className={`no-drag`}
                                >
                                    / {page.totalPages}
                                </p>
                            </div>

                            <Righter onClick={() => handleButtonClick(Number(inputValue) + 1)} />
                        </div>

                        <div
                            style={{ fontSize: "13px", margin: 0, padding: 0, display: "flex" }}
                            className={`flex no-drag`}
                        >
                            <p style={{ margin: 0 }}>total</p>
                            <p
                                style={{
                                    margin: "0 5px",
                                    borderLeft: "1px solid",
                                    borderColor: "var(--jf-deepGray)",
                                }}
                            ></p>
                            <p style={{ margin: 0 }}>{page.totalElements}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Pagination;
