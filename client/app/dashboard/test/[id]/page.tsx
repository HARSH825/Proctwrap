'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Users, Clock, AlertTriangle, Eye, Calendar, FileText, Image, ChevronDown, Download, ArrowUp, ArrowDown } from 'lucide-react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import { testAPI } from '../../../../lib/api';
import { Attempt } from '../../../../types';

type SortField = 'date' | 'name' | 'email' | 'status' | 'tabSwitch' | 'fullscreenExit' | 'multipleFaces' | 'phoneDetection' | 'totalViolations';
type SortDirection = 'asc' | 'desc';

export default function TestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

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

  const sortedAttempts = useMemo(() => {
    const sorted = [...attempts].sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'date':
          aValue = new Date(a.startedAt).getTime();
          bValue = new Date(b.startedAt).getTime();
          break;
        case 'name':
          aValue = a.student.name.toLowerCase();
          bValue = b.student.name.toLowerCase();
          break;
        case 'email':
          aValue = a.student.email.toLowerCase();
          bValue = b.student.email.toLowerCase();
          break;
        case 'status':
          aValue = a.finishedAt ? 1 : 0;
          bValue = b.finishedAt ? 1 : 0;
          break;
        case 'tabSwitch':
          aValue = a.tabSwitchCount;
          bValue = b.tabSwitchCount;
          break;
        case 'fullscreenExit':
          aValue = a.fullscreenExitCount;
          bValue = b.fullscreenExitCount;
          break;
        case 'multipleFaces':
          aValue = a.multipleFacesCount;
          bValue = b.multipleFacesCount;
          break;
        case 'phoneDetection':
          aValue = a.phoneDetectionCount;
          bValue = b.phoneDetectionCount;
          break;
        case 'totalViolations':
          aValue = getTotalViolations(a);
          bValue = getTotalViolations(b);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [attempts, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'date' ? 'desc' : 'asc'); 
    }
    setShowSortDropdown(false);
  };

  const exportToWord = () => {
    // Create HTML content for the document
    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Proctorap Test Details Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
            h2 { color: #555; margin-top: 30px; }
            .summary { display: flex; flex-wrap: wrap; gap: 20px; margin: 20px 0; }
            .summary-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; min-width: 200px; }
            .summary-card h3 { margin: 0 0 10px 0; color: #007bff; }
            .summary-card .value { font-size: 24px; font-weight: bold; margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f8f9fa; font-weight: bold; }
            .status-completed { color: #28a745; font-weight: bold; }
            .status-progress { color: #ffc107; font-weight: bold; }
            .violation-low { color: #28a745; }
            .violation-medium { color: #ffc107; }
            .violation-high { color: #dc3545; }
            .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
          </style>
        </head>
        <body>
          <h1>Test Details Report</h1>
          <p><strong>Generated on:</strong> ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB')}</p>
          
          <h2>Summary</h2>
          <div class="summary">
            <div class="summary-card">
              <h3>Total Attempts</h3>
              <div class="value">${attempts.length}</div>
            </div>
            <div class="summary-card">
              <h3>Completed</h3>
              <div class="value">${attempts.filter(a => a.finishedAt).length}</div>
            </div>
            <div class="summary-card">
              <h3>Total Violations</h3>
              <div class="value">${attempts.reduce((total, attempt) => total + getTotalViolations(attempt), 0)}</div>
            </div>
            <div class="summary-card">
              <h3>High Risk Students</h3>
              <div class="value">${attempts.filter(a => getTotalViolations(a) > 3).length}</div>
            </div>
          </div>

          <h2>Detailed Results</h2>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Started</th>
                <th>Status</th>
                <th>Tab Switch</th>
                <th>Fullscreen Exit</th>
                <th>Multiple Faces</th>
                <th>Phone Detection</th>
                <th>Total Violations</th>
              </tr>
            </thead>
            <tbody>
              ${sortedAttempts.map(attempt => {
                const totalViolations = getTotalViolations(attempt);
                const violationClass = totalViolations === 0 ? 'violation-low' : 
                                     totalViolations <= 3 ? 'violation-medium' : 'violation-high';
                return `
                  <tr>
                    <td>${attempt.student.name}</td>
                    <td>${attempt.student.email}</td>
                    <td>${new Date(attempt.startedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</td>
                    <td class="${attempt.finishedAt ? 'status-completed' : 'status-progress'}">
                      ${attempt.finishedAt ? 'Completed' : 'In Progress'}
                    </td>
                    <td class="${getViolationSeverity(attempt.tabSwitchCount).color.includes('success') ? 'violation-low' : 
                               getViolationSeverity(attempt.tabSwitchCount).color.includes('warning') ? 'violation-medium' : 'violation-high'}">
                      ${attempt.tabSwitchCount}
                    </td>
                    <td class="${getViolationSeverity(attempt.fullscreenExitCount).color.includes('success') ? 'violation-low' : 
                               getViolationSeverity(attempt.fullscreenExitCount).color.includes('warning') ? 'violation-medium' : 'violation-high'}">
                      ${attempt.fullscreenExitCount}
                    </td>
                    <td class="${getViolationSeverity(attempt.multipleFacesCount).color.includes('success') ? 'violation-low' : 
                               getViolationSeverity(attempt.multipleFacesCount).color.includes('warning') ? 'violation-medium' : 'violation-high'}">
                      ${attempt.multipleFacesCount}
                    </td>
                    <td class="${getViolationSeverity(attempt.phoneDetectionCount).color.includes('success') ? 'violation-low' : 
                               getViolationSeverity(attempt.phoneDetectionCount).color.includes('warning') ? 'violation-medium' : 'violation-high'}">
                      ${attempt.phoneDetectionCount}
                    </td>
                    <td class="${violationClass}"><strong>${totalViolations}</strong></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>This report contains ${attempts.length} student attempt(s) for the selected test.</p>
            <p><strong>Legend:</strong></p>
            <p>• <span class="violation-low">Green:</span> No violations (0) • <span class="violation-medium">Yellow:</span> Low violations (1-3) • <span class="violation-high">Red:</span> High violations (4+)</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `test-details-report-${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sortOptions = [
    { field: 'date', label: 'Date & Time' },
    { field: 'name', label: 'Student Name' },
    { field: 'email', label: 'Email' },
    { field: 'status', label: 'Status' },
    { field: 'tabSwitch', label: 'Tab Switch Count' },
    { field: 'fullscreenExit', label: 'Fullscreen Exit Count' },
    { field: 'multipleFaces', label: 'Multiple Faces Count' },
    { field: 'phoneDetection', label: 'Phone Detection Count' },
    { field: 'totalViolations', label: 'Total Violations' },
  ];

  const getSortIcon = () => {
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
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

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 items-center">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-surface-light)',
                  color: 'var(--color-text)'
                }}
              >
                Sort by: {sortOptions.find(opt => opt.field === sortField)?.label}
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>

              {showSortDropdown && (
                <div 
                  className="absolute z-10 mt-2 w-56 rounded-md shadow-lg border"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-surface-light)'
                  }}
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.field}
                        onClick={() => {
                          setSortField(option.field as SortField);
                          setShowSortDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-opacity-50 transition-colors duration-150 flex items-center justify-between"
                        style={{ 
                          color: 'var(--color-text)',
                          backgroundColor: sortField === option.field ? 'var(--color-surface-light)' : 'transparent'
                        }}
                      >
                        {option.label}
                        {sortField === option.field && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sort Direction Toggle */}
            <button
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border transition-colors duration-200 hover:opacity-80"
              style={{
                backgroundColor: sortDirection === 'desc' ? 'var(--color-primary)' : 'var(--color-surface)',
                borderColor: sortDirection === 'desc' ? 'var(--color-primary)' : 'var(--color-surface-light)',
                color: sortDirection === 'desc' ? 'white' : 'var(--color-text)'
              }}
              title={`Currently sorting ${sortDirection === 'desc' ? 'descending' : 'ascending'}. Click to switch.`}
            >
              {getSortIcon()}
              <span className="ml-1">{sortDirection.toUpperCase()}</span>
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToWord}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-success)',
              color: 'white'
            }}
            disabled={attempts.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export to Word
          </button>
        </div>

        {/* Attempts Table */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
            Student Attempts 
            <span className="text-sm font-normal ml-2" style={{ color: 'var(--color-text-secondary)' }}>
              ({sortedAttempts.length} total)
            </span>
          </h2>
          
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
                    {sortedAttempts.map((attempt) => (
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

      {showSortDropdown && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowSortDropdown(false)}
        />
      )}
    </DashboardLayout>
  );
}