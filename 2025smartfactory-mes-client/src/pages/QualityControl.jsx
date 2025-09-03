import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8082/api/qualityControl"; // MES 서버 API

export default function QualityControl() {
    const [qcList, setQcList] = useState([]);

    useEffect(() => {
        loadQc();
    }, []);

    // 데이터 로드
    const loadQc = async () => {
        try {
            const { data } = await axios.get(API_BASE);
            setQcList(data);
        } catch (err) {
            console.error("품질검사 데이터 조회 실패", err);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">품질검사 결과 목록</h2>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">품질검사ID</th>
                            <th className="px-4 py-2 border">발주ID</th>
                            <th className="px-4 py-2 border">발주상세ID</th>
                            <th className="px-4 py-2 border">작업지시</th>
                            <th className="px-4 py-2 border">자재ID</th>
                            <th className="px-4 py-2 border">검사자</th>
                            <th className="px-4 py-2 border">검사일</th>
                            <th className="px-4 py-2 border">검사결과</th>
                            <th className="px-4 py-2 border">합격수량</th>
                            <th className="px-4 py-2 border">불합격수량</th>
                            <th className="px-4 py-2 border">불량유형</th>
                            <th className="px-4 py-2 border">비고</th>
                            <th className="px-4 py-2 border">생성일</th>
                            <th className="px-4 py-2 border">수정일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qcList.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="text-center py-4 text-gray-500">
                                    검사 데이터가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            qcList.map((qc) => (
                                <tr key={qc.qcId} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{qc.qcId}</td>
                                    <td className="px-4 py-2 border">{qc.purchaseOrderId}</td>
                                    <td className="px-4 py-2 border">{qc.orderDetailId}</td>
                                    <td className="px-4 py-2 border">{qc.workOrderId}</td>
                                    <td className="px-4 py-2 border">{qc.materialId}</td>
                                    <td className="px-4 py-2 border">{qc.inspectorId}</td>
                                    <td className="px-4 py-2 border">{qc.inspectionDate}</td>
                                    <td
                                        className={`px-4 py-2 border font-bold ${qc.result === "합격"
                                            ? "text-green-600"
                                            : qc.result === "불합격"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                            }`}
                                    >
                                        {qc.result}
                                    </td>
                                    <td className="px-4 py-2 border">{qc.passQuantity}</td>
                                    <td className="px-4 py-2 border">{qc.failQuantity}</td>
                                    <td className="px-4 py-2 border">{qc.defectType}</td>
                                    <td className="px-4 py-2 border">{qc.notes}</td>
                                    <td className="px-4 py-2 border">{qc.createdAt}</td>
                                    <td className="px-4 py-2 border">{qc.updatedAt}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={loadQc}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    새로고침
                </button>
            </div>
        </div>
    );
}
