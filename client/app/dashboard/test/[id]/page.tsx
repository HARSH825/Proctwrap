'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Users, Clock, AlertTriangle, Eye, Calendar, FileText, Image } from 'lucide-react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import { testAPI } from '../../../../lib/api';
import { Attempt } from '../../../../types';

export default function TestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttempts();
  }, []);

  const loadAttempts = async () => {
    try {
      const response = await testAPI.getTestAttempts(params.id as string);
      setAttempts(response.data);
    } catch (error) {
      console.error('Failed to load attempts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalViolations = (attempt: Attempt) => {
    return attempt.tabSwitchCount + attempt.fullscreenExitCount + 
           attempt.multipleFacesCount + attempt.phoneDetectionCount;
  };

  const getViolationSeverity = (count: number) => {
    if (count === 0) return { color: 'var(--color-success)', bg: 'rgba(16, 185, 129, 0.1)' };
    if (count <= 3) return { color: 'var(--color-warning)', bg: 'rgba(245, 158, 11, 0.1)' };
    return { color: 'var(--color-danger)', bg: 'rgba(239, 68, 68, 0.1)' };
  };

  const handleShowEvidence = (attemptId: string) => {
    router.push(`/evidence/${attemptId}`);
  };

  if (loading) {
    return (
      <DashboardLayout title="Test Details">
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner h-16 w-16"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Test Details">
      <div className="space-y-6 max-w-full">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stats-card">
            <div className="flex items-center">
              <Users className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              <div className="ml-3">
                <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{attempts.length}</p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Total Attempts</p>
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center">
              <Clock className="h-8 w-8" style={{ color: 'var(--color-success)' }} />
              <div className="ml-3">
                <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  {attempts.filter(a => a.finishedAt).length}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Completed</p>
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8" style={{ color: 'var(--color-warning)' }} />
              <div className="ml-3">
                <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  {attempts.reduce((total, attempt) => total + getTotalViolations(attempt), 0)}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Total Violations</p>
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center">
              <Eye className="h-8 w-8" style={{ color: 'var(--color-danger)' }} />
              <div className="ml-3">
                <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  {attempts.filter(a => getTotalViolations(a) > 3).length}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>High Risk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attempts Table */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Student Attempts</h2>
          
          {attempts.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }} />
              <p style={{ color: 'var(--color-text)' }}>No attempts yet</p>
              <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>Students will appear here once they start taking the test</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-full" style={{ width: '100%', maxWidth: '80vw' }}>
                <table className="w-full divide-y" style={{ borderColor: 'var(--color-surface-light)' }}>
                  <thead style={{ backgroundColor: 'var(--color-surface-light)' }}>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text)', minWidth: '180px' }}>
                        Student
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text)', minWidth: '140px' }}>
                        Started
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text)', minWidth: '100px' }}>
                        Status
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text)', minWidth: '80px' }}>
                        Tab Switch
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text)', minWidth: '80px' }}>
                        Fullscreen Exit
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text)', minWidth: '80px' }}>
                        Multiple Faces
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text)', minWidth: '80px' }}>
                        Phone Detection
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text)', minWidth: '60px' }}>
                        Total
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text)', minWidth: '120px' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-surface-light)' }}>
                    {attempts.map((attempt) => (
                      <tr key={attempt.id} className="hover:bg-opacity-50" style={{ backgroundColor: 'transparent' }}>
                        <td className="px-3 py-4 whitespace-nowrap" style={{ minWidth: '180px' }}>
                          <div>
                            <p className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{attempt.student.name}</p>
                            <p className="text-xs truncate" style={{ color: 'var(--color-text-secondary)', maxWidth: '160px' }} title={attempt.student.email}>
                              {attempt.student.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-xs" style={{ color: 'var(--color-text-secondary)', minWidth: '140px' }}>
                          {new Date(attempt.startedAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap" style={{ minWidth: '100px' }}>
                          <span 
                            className="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                            style={{ 
                              backgroundColor: attempt.finishedAt ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                              color: attempt.finishedAt ? 'var(--color-success)' : 'var(--color-warning)'
                            }}
                          >
                            {attempt.finishedAt ? 'Completed' : 'In Progress'}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center" style={{ minWidth: '80px' }}>
                          <span 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: getViolationSeverity(attempt.tabSwitchCount).bg,
                              color: getViolationSeverity(attempt.tabSwitchCount).color
                            }}
                          >
                            {attempt.tabSwitchCount}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center" style={{ minWidth: '80px' }}>
                          <span 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: getViolationSeverity(attempt.fullscreenExitCount).bg,
                              color: getViolationSeverity(attempt.fullscreenExitCount).color
                            }}
                          >
                            {attempt.fullscreenExitCount}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center" style={{ minWidth: '80px' }}>
                          <span 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: getViolationSeverity(attempt.multipleFacesCount).bg,
                              color: getViolationSeverity(attempt.multipleFacesCount).color
                            }}
                          >
                            {attempt.multipleFacesCount}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center" style={{ minWidth: '80px' }}>
                          <span 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: getViolationSeverity(attempt.phoneDetectionCount).bg,
                              color: getViolationSeverity(attempt.phoneDetectionCount).color
                            }}
                          >
                            {attempt.phoneDetectionCount}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-center" style={{ minWidth: '60px' }}>
                          <span 
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold"
                            style={{
                              backgroundColor: getViolationSeverity(getTotalViolations(attempt)).bg,
                              color: getViolationSeverity(getTotalViolations(attempt)).color
                            }}
                          >
                            {getTotalViolations(attempt)}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-center" style={{ minWidth: '120px' }}>
                          <button
                            onClick={() => handleShowEvidence(attempt.id)}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md transition-colors duration-200 hover:opacity-80"
                            style={{
                              backgroundColor: 'var(--color-primary)',
                              color: 'white'
                            }}
                          >
                            <Image className="h-3 w-3 mr-1" />
                            Evidence
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}